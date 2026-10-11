import assert from 'node:assert/strict';

import {buildDetailerSite,escapeHtml} from './prototype/dist/generator.mjs';
const hostile='<script>alert(1)</script> " &';
assert.equal(escapeHtml(hostile),'&lt;script&gt;alert(1)&lt;/script&gt; &quot; &amp;');
const page=buildDetailerSite({name:hostile,city:hostile,email:'javascript:alert(1)',phone:'1-555-0100',theme:'bad',packages:[{name:hostile,price:'$100',detail:hostile}]});
assert.ok(!page.includes('<script>'));assert.ok(!page.includes('javascript:'));assert.ok(page.includes('tel:15550100'));assert.ok(page.includes('&lt;script&gt;'));assert.ok(page.includes('#153a72'));
const email=buildDetailerSite({name:'Blue Detail',email:'owner@example.com'});assert.ok(email.includes('mailto:owner@example.com?subject='));
const noContact=buildDetailerSite({});assert.ok(noContact.includes('Add a business email or phone'));assert.ok(noContact.includes('width=device-width'));assert.ok(noContact.includes('@media(max-width:650px)'));
for(const theme of ['blue','green','clay'])assert.ok(buildDetailerSite({theme}).includes('Website draft'));

console.log('Generator checks passed.');

