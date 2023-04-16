import React from 'react';

function extractUrlFromResult(results, fileName) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = results.match(urlRegex);

    if (!matches) {
        return '';
    }

    const linkUrl = matches[0] + "/" + fileName;

    return linkUrl;
}

function extractLink(results, fileName) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = results.match(urlRegex);

    if (!matches) {
        return results;
    }

    const linkText = results.replace(matches[0], '').trim() + ": ";
    const linkUrl = matches[0] + "/" + fileName;

    return (
        <div className="result">
            {linkText}{linkUrl && <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>{linkUrl}</a>}
        </div>
    );
}
export { extractLink, extractUrlFromResult };