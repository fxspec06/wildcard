//
//  ViewController.swift
//  wildcard
//
//  Created by Bryan Leasot on 8/10/18.
//  Copyright © 2018 fx-tek. All rights reserved.
//

import UIKit
import WebKit
import AVFoundation


class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {
    @IBOutlet var wpWebView: WKWebView!
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "playFile", let messageBody = message.body as? String {
            soundName = messageBody
            playSound()
        }
        if message.name == "print", let messageBody = message.body as? String {
            print(messageBody)
        }
        if message.name == "safari", let messageBody = message.body as? String {
            // todo
            UIApplication.shared.open(URL(string : messageBody)!, options: [:], completionHandler: { (status) in })
        }
        if message.name == "email", let messageBody = message.body as? String {
            // todo
            print(messageBody)
            if let url = URL(string: messageBody) {
                if #available(iOS 10.0, *) {
                    UIApplication.shared.open(url)
                } else {
                    UIApplication.shared.openURL(url)
                }
            }
        }
    }
    var soundName = ""
    var config: WKWebViewConfiguration!
    var player: AVAudioPlayer?
    
    func playSound() {
        print("Playing sound.. " + soundName)
        guard let url = Bundle.main.url(forResource: soundName, withExtension: "wav") else { return }
        
        do {
            try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
            try AVAudioSession.sharedInstance().setActive(true)
            
            
            
            /* The following line is required for the player to work on iOS 11. Change the file type accordingly*/
            player = try AVAudioPlayer(contentsOf: url, fileTypeHint: AVFileType.wav.rawValue)
            
            /* iOS 10 and earlier require the following line:
             player = try AVAudioPlayer(contentsOf: url, fileTypeHint: AVFileTypeMPEGLayer3) */
            
            guard let player = player else { return }
            
            player.play()
            
        } catch let error {
            print(error.localizedDescription)
        }
    }
    required init?(coder aDecoder: NSCoder) {
        /*let scriptURL = Bundle.main.path(forResource: "launch", ofType: "js")
         
         let scriptContent:String?
         
         do {
         scriptContent = try String(contentsOfFile: scriptURL!, encoding: String.Encoding.utf8)
         }
         catch _ {
         scriptContent = nil
         }
         
         let script = WKUserScript(source: scriptContent!, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
         
         config.userContentController.addUserScript(script)
         */
        
        super.init(coder: aDecoder)
        
        self.wpWebView?.navigationDelegate = self
    }
    
    
    
    
    
    
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        
        
        
        let url = Bundle.main.url(forResource: "index", withExtension: "html")!
        
        wpWebView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        wpWebView.allowsBackForwardNavigationGestures = false
        print("view loaded..")
    }
    
    
    
    override func loadView() {
        config = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        
        userContentController.add(self, name: "playFile")
        userContentController.add(self, name: "print")
        userContentController.add(self, name: "safari")
        userContentController.add(self, name: "email")
        
        config.userContentController = userContentController
        
        wpWebView = WKWebView(frame: CGRect.zero, configuration: config)
        
        wpWebView.navigationDelegate = self
        view = wpWebView
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        title = wpWebView.title
    }
}


