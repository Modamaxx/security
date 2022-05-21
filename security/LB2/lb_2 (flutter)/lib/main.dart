import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as Http;


class MyForm extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MyFormState();
}

class MyFormState extends State {

  final _formKey = GlobalKey<FormState>();

  int statusCode;
  String ip = "";
  String port = "";
  String message = "";
  String hash = "";

  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.all(10.0),
        child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                Text(
                  'IP or DNS name:',
                  style: TextStyle(fontSize: 20.0),
                ),
                // ignore: missing_return
                TextFormField(validator: (value)
                {
                  if (value.isEmpty) return 'Enter IP!';
                  try { ip = value.toString(); } catch(e) {
                    ip = null;
                    return e.toString();
                  }
                }),
                SizedBox(height: 20.0),
                Text(
                  'PORT:',
                  style: TextStyle(fontSize: 20.0),
                ),
                // ignore: missing_return
                TextFormField(validator: (value) {
                  if (value.isEmpty) return 'Enter Port!';
                  try { port = value.toString(); } catch(e) {
                    port = null;
                    return e.toString();
                  }
                }),
                SizedBox(height: 20.0),
                Text('Message:', style: TextStyle(fontSize: 20.0),),
                // ignore: missing_return
                TextFormField(validator: (value) {
                  if (value.isEmpty) return 'Enter Message!';
                  try { message = value.toString(); } catch(e) {
                    message = null;
                    return e.toString();
                  }
                }),
                SizedBox(height: 20.0),
                Text(
                  'Hash:',
                  style: TextStyle(fontSize: 20.0),
                ),
                // ignore: missing_return
                TextFormField(validator: (value) {
                  if (value.isEmpty) return 'Enter Hash!';
                  try { hash = value.toString(); } catch(e) {
                    hash = null;
                    return e.toString();
                  }
                }),
                RaisedButton(onPressed: () async {
                  if(_formKey.currentState.validate()) Scaffold.of(context).
                  showSnackBar(
                      SnackBar(
                        content: Text('Success'),
                        backgroundColor: Colors.green,
                      )
                  );
                  HttpClient client = new HttpClient();
                  client.badCertificateCallback =((X509Certificate cert, String host, int port) => true);

                  String url = "https://" + ip + ":" + port + "/vhash";
                  Map map = { "data" : message , "generHash" : hash };
                  HttpClientRequest request = await client.postUrl(Uri.parse(url));

                  request.headers.set('content-type', 'application/json');
                  request.add(utf8.encode(json.encode(map)));

                  HttpClientResponse response = await request.close();
                  String reply = await response.transform(utf8.decoder).join();
                  print(reply);
                  },
                  child: Text('Send'),
                  color: Colors.blue,
                  textColor: Colors.white,
                ),
              ],
            )
        )
    );
  }
}

void main() => runApp(
    new MaterialApp(
        debugShowCheckedModeBanner: false,
        home: new Scaffold(
            appBar: new AppBar(title: new Text('LB2_3')),
            body: new MyForm()
        )
    )
);