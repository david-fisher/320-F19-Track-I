//
//  DetailViewController.swift
//  iOSOrchardWatch
//
//  Created by Annabel Schneider on 11/8/19.
//  Copyright © 2019 Annabel Schneider. All rights reserved.
//

import UIKit
import WebKit

class DetailViewController: UIViewController,  UIImagePickerControllerDelegate,
UINavigationControllerDelegate{
   
    var webView: WKWebView!
    @IBOutlet weak var imagePicked: UIImageView!

    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self as? WKUIDelegate
        view = webView
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        setToolBar()
        
        let myURL = URL(string:"https://coldspringorchard.com/")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
        
    }
    
    fileprivate func setToolBar() {
        let screenWidth = self.view.bounds.width
        let backButton = UIBarButtonItem(title: "Back", style: .plain, target: self, action: #selector(goBack))
        let uploadButton = UIBarButtonItem(title: "Upload", style: .plain, target: self, action: #selector(openCameraRoll))
        let cameraButton = UIBarButtonItem(title: "Camera", style: .plain, target: self, action: #selector(openCamera))
        let toolBar = UIToolbar(frame: CGRect(x: 0, y: 0, width: screenWidth, height: 44))
        toolBar.isTranslucent = false
        toolBar.translatesAutoresizingMaskIntoConstraints = false
        toolBar.items = [backButton, cameraButton, uploadButton]
        webView.addSubview(toolBar)
        // Constraints
        toolBar.bottomAnchor.constraint(equalTo: webView.bottomAnchor, constant: 0).isActive = true
        toolBar.leadingAnchor.constraint(equalTo: webView.leadingAnchor, constant: 0).isActive = true
        toolBar.trailingAnchor.constraint(equalTo: webView.trailingAnchor, constant: 0).isActive = true
    }
    @objc private func goBack() {
        let myURL = URL(string:"https://coldspringorchard.com/")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
    }
    
    @objc private func openCameraRoll() {
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            let imagePicker = UIImagePickerController()
            imagePicker.delegate = self
            imagePicker.sourceType = .photoLibrary;
            imagePicker.allowsEditing = true
            self.present(imagePicker, animated: true, completion: nil)
        }
    }

    @objc private func openCamera() {
        if UIImagePickerController.isSourceTypeAvailable(.camera) {
            let imagePicker = UIImagePickerController()
            imagePicker.delegate = self
            imagePicker.sourceType = .camera;
            imagePicker.allowsEditing = false
            self.present(imagePicker, animated: true, completion: nil)
        }
    }
    
    func imagePickerController(_ picker: UIImagePickerController,
        didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]){
        guard let selectedImage = info[.originalImage] as? UIImage else {
            fatalError("Expected a dictionary containing an image, but was provided the following: \(info)")
            }
        /*imagePicked.image? = selectedImage
        let url = URL(string: "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/ml/mobile_classify")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        let data = convertImageToBase64String(image: selectedImage)
        let json: [String: Any] = ["model": "resnet_keras.h5", "pic": data]
        var status = 0;
        let jsonData = try? JSONSerialization.data(withJSONObject: json)
        request.httpBody = jsonData
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print("error: \(error)")
            } else {
                if let response = response as? HTTPURLResponse {
                    status = response.statusCode
                    print("statusCode: \(response.statusCode)")
                    let httpResponse = response as HTTPURLResponse
                    let field = httpResponse.allHeaderFields["label"]
                    print(field)
                }
                print(data)
                if status == 200{
                    print("success")
                }
                else{
                    //throw ValidationError("Invalid access code")
                }
            }
        }
        task.resume()
        */
        
        self.dismiss(animated: true, completion: nil)
        
        let myURL = URL(string:"https://coldspringorchard.com/")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
    }
    
}

public func  convertImageToBase64String(image : UIImage ) -> String
{
    let strBase64 =  image.pngData()?.base64EncodedString()
    return strBase64!
}


