"ui";

$ui.layout(
  <frame>
    <webview id="webview" w="*" h="*"></webview>
  </frame>
);

$ui.webview.loadUrl("http://localhost:3000/index.html");