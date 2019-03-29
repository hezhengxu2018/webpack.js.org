(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{323:function(n,s,a){"use strict";a.r(s),s.default='<p><strong>Plugins</strong> are the <a href="https://github.com/webpack/tapable">backbone</a> of webpack. webpack itself is built on the <strong>same plugin system</strong> that you use in your webpack configuration!</p>\n<p>They also serve the purpose of doing <strong>anything else</strong> that a <a href="/concepts/loaders">loader</a> cannot do.</p>\n<h2 id="anatomy">Anatomy<a href="#anatomy" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>A webpack <strong>plugin</strong> is a JavaScript object that has an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply"><code>apply</code></a> method. This <code>apply</code> method is called by the webpack compiler, giving access to the <strong>entire</strong> compilation lifecycle.</p>\n<p><strong>ConsoleLogOnBuildWebpackPlugin.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> pluginName <span class="token operator">=</span> <span class="token string">\'ConsoleLogOnBuildWebpackPlugin\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">ConsoleLogOnBuildWebpackPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>run<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">,</span> compilation <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'The webpack build process is starting!!!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n<p>The first parameter of the tap method of the compiler hook should be a camelized version of the plugin name. It is advisable to use a constant for this so it can be reused in all hooks.</p>\n<h2 id="usage">Usage<a href="#usage" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Since <strong>plugins</strong> can take arguments/options, you must pass a <code>new</code> instance to the <code>plugins</code> property in your webpack configuration.</p>\n<p>Depending on how you are using webpack, there are multiple ways to use plugins.</p>\n<h3 id="configuration">Configuration<a href="#configuration" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'html-webpack-plugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//installed via npm</span>\n<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//to access built-in plugins</span>\n<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token punctuation">:</span> <span class="token string">\'./path/to/my/entry/file.js\'</span><span class="token punctuation">,</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    filename<span class="token punctuation">:</span> <span class="token string">\'my-first-webpack.bundle.js\'</span><span class="token punctuation">,</span>\n    path<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'dist\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.(js|jsx)$/</span><span class="token punctuation">,</span>\n        use<span class="token punctuation">:</span> <span class="token string">\'babel-loader\'</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProgressPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>template<span class="token punctuation">:</span> <span class="token string">\'./src/index.html\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="node-api">Node API<a href="#node-api" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>When using the Node API, you can also pass plugins via the <code>plugins</code> property in the configuration.</p>\n<p><strong>some-node-script.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//to access webpack runtime</span>\n<span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./webpack.config.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> compiler <span class="token operator">=</span> <span class="token function">webpack</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProgressPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncompiler<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> stats<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="tip">\n<p>Did you know: The example seen above is extremely similar to the <a href="https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292">webpack runtime itself!</a> There are lots of great usage examples hiding in the <a href="https://github.com/webpack/webpack">webpack source code</a> that you can apply to your own configurations and scripts!</p>\n</blockquote>\n'}}]);