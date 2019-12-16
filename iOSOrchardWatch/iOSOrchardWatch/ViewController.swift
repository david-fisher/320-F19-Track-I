//
//  ViewController.swift
//  iOSOrchardWatch
//
//  Created by Annabel Schneider on 11/7/19.
//  Copyright © 2019 Annabel Schneider. All rights reserved.
//

import UIKit

class ViewController: UIViewController{
    @IBOutlet weak var codeinput: UITextField!
   
    @IBAction func loginButton(_ sender: Any) {

        //send code to lambda. if good, go to next page. if not, stay on this page with popup saying invalid code
        // /Frontend-Lambda/account/mobile/{code}
        let url = URL(string: "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/authorization_mobile")!
        let accesscode:String? = codeinput.text!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        let json: [String: Any] = ["code": accesscode]
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
                }
                if accesscode != nil, let dataString = accesscode{
                    print("data: \(dataString)")
                }
                if status == 200{
                    DispatchQueue.main.async { self.performSegue(withIdentifier: "login", sender: self)}
                }
                else{
                    //throw ValidationError("Invalid access code")
                }
            }
        }
        task.resume()
        
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
}

