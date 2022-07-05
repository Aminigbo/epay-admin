import 'dart:io';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OgaPredictor',
      debugShowCheckedModeBanner: false,
      home: WebviewExample(),
    );
  }
}

class WebviewExample extends StatefulWidget {
  const WebviewExample({Key? key}) : super(key: key);

  @override
  _WebviewExampleState createState() => _WebviewExampleState();
}

class _WebviewExampleState extends State<WebviewExample> {
  int position = 1;

  late WebViewController controllerGlobal;

  Future<bool> _exitApp(BuildContext context) async {
    if (await controllerGlobal.canGoBack()) {
      // print("onwill goback");
      controllerGlobal.goBack();
      return Future.value(true);
    } else {
      Scaffold.of(context).showSnackBar(
        const SnackBar(content: Text("No back history item")),
      );
      return Future.value(false);
    }
  }

  @override
  void initState() {
    super.initState();
    if (Platform.isAndroid) WebView.platform = SurfaceAndroidWebView();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: WillPopScope(
        onWillPop: () => _exitApp(context),
        child: IndexedStack(index: position, children: <Widget>[
          WebView(
            initialUrl: 'https://ogapredictor.netlify.app',
            javascriptMode: JavascriptMode.unrestricted,
            onPageStarted: (value) {
              setState(() {
                position = 1;
              });
            },
            onPageFinished: (value) {
              setState(() {
                position = 0;
              });
            },
          ),
          Container(
            color: Colors.white,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    "assets/waiting.png",
                    width: 320,
                    height: 180,
                  ),
                  CircularProgressIndicator(
                    strokeWidth: 1.0,
                  )
                ],
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
