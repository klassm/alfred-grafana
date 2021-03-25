#!/usr/local/bin/node
const alfy = require("alfy");

const apiToken = alfy.config.get("grafanaApiToken");
const grafanaUrl = alfy.config.get("grafanaUrl");

async function search() {
    const options = {
        method: 'GET',
        query: {
            query: process.argv[2]
        },
        headers: {
            'Authorization': `Bearer ${apiToken}`
        },
        maxAge: 300000
    };
    try {
        const data = await alfy.fetch(`${grafanaUrl}/api/search`, options);
        const items = data
            .map(x => ({
                title: x.title,
                arg: `${grafanaUrl}/dashboard/${x.uri}`
            }));

        alfy.output(items);
    } catch (e) {
        throw e;
    }
}

void search();
