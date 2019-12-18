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
    @IBOutlet var code_label: UILabel!
    
    
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
                    Cache<String, String>();
                }
                else{
//                    DispatchQueue.main.async { self.codeinput.text = "Invalid access code"}
                    DispatchQueue.main.async { self.code_label.text = "Invalid Key"}
                }
            }
        }
        task.resume()
        
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
}



//caching

private extension Cache {
    final class WrappedKey: NSObject {
        let key: Key
        
        init(_ key: Key) { self.key = key }
        
        override var hash: Int { return key.hashValue }
        
        override func isEqual(_ object: Any?) -> Bool {
            guard let value = object as? WrappedKey else {
                return false
            }
            
            return value.key == key
        }
    }
}

private extension Cache {
    final class Entry {
        let value: Value
        
        init(value: Value) {
            self.value = value
        }
    }
}

final class Cache<Key: Hashable, Value> {
    private let wrapped = NSCache<WrappedKey, Entry>()
    
    func insert(_ value: Value, forKey key: Key) {
        let entry = Entry(value: value)
        wrapped.setObject(entry, forKey: WrappedKey(key))
    }
    
    func value(forKey key: Key) -> Value? {
        let entry = wrapped.object(forKey: WrappedKey(key))
        return entry?.value
    }
    
    func removeValue(forKey key: Key) {
        wrapped.removeObject(forKey: WrappedKey(key))
    }
}

extension Cache {
    subscript(key: Key) -> Value? {
        get { return value(forKey: key) }
        set {
            guard let value = newValue else {
                // If nil was assigned using our subscript,
                // then we remove any value for that key:
                removeValue(forKey: key)
                return
            }
            
            insert(value, forKey: key)
        }
    }
}


//Caching login
class Login {
    typealias Handler = (Result<String, Error>) -> Void
    
    private let cache = Cache<String, String>()
    
    func login(withID id: String,
                     then handler: @escaping Handler) {
        if let cached = cache[id] {
            return handler(.success(cached))
        }
        
    }
}
