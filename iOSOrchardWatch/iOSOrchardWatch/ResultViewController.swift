//
//  ResultViewController.swift
//  iOSOrchardWatch
//
//  Created by Annabel Schneider on 12/18/19.
//  Copyright © 2019 Annabel Schneider. All rights reserved.
//

import UIKit

class ResultViewController: UIViewController {

    @IBAction func returnButton(_ sender: Any){
        performSegue(withIdentifier: "website", sender: self)
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
