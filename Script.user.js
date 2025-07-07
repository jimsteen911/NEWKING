// ==UserScript==
// @name         NJ Unclaimed Funds → CSV Export
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Export NJ Unclaimed Funds search results to CSV in Safari via Tampermonkey
// @author       Code Copilot
// @match        https://unclaimedfunds.nj.gov/app/claim-search*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ROW_SELECTOR = '.claim-row';            // selector for result rows
    const COL_SELECTORS = {                       // column selectors inside a row
        claimant: '.claimant',                    // claimant name
        city: '.city',                            // city
        state: '.state',                          // state
        fundType: '.fund-type',                   // fund type
        amount: '.amount'                         // amount
    };

    const escapeCSV = (text) =>
        `"${String(text).trim().replace(/"/g, '""')}"`;

    const buildCSV = () => {
        const rows = [[
            'Claimant', 'City', 'State', 'Fund Type', 'Amount'
        ]];
        document.querySelectorAll(ROW_SELECTOR).forEach(r => {
            const data = Object.values(COL_SELECTORS).map(sel =>
                escapeCSV(r.querySelector(sel)?.innerText || '')
            );
            rows.push(data);
        });
        return rows.map(r => r.join(',')).join('\n');
    };

    const downloadCSV = () => {
        const csv = buildCSV();
        const blob = new Blob([csv], {type: 'text/csv'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'nj_unclaimed_funds.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const addButton = () => {
        if (document.getElementById('export-csv-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'export-csv-btn';
        btn.innerText = 'Export Search (CSV)';
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '8px 12px',
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            zIndex: 9999,
            cursor: 'pointer',
        });
        btn.onclick = downloadCSV;
        document.body.appendChild(btn);
    };

    const waitForResults = () => {
        const observer = new MutationObserver((muts, obs) => {
            if (document.querySelectorAll(ROW_SELECTOR).length > 0) {
                addButton();
                obs.disconnect();
            }
        });
        observer.observe(document.body, {childList: true, subtree: true});
    };

    window.addEventListener('load', waitForResults);
})();
