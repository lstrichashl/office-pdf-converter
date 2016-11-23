[![Linux Build](https://img.shields.io/badge/linux-passing-brightgreen.svg?style=flat)]()
[![Windows Build](https://img.shields.io/badge/windows-passing-brightgreen.svg?style=flat)]()

Office PDF Converter
=========

Node.js api server for converting office files to pdf.
This will help you show office files in web without any microsoft services.


## Routes


* __/view__

    url - file url that we want to convert.

    returns pdf file

    ```http
    http://localhost:3000/view?url=http://www.stories4kid.com/313667_196.jpg
    ```


* __/sanity__

    returns status 200.

* __/config__

    returns configuration of service


## Requirements
1. install libreoffice from [here](https://www.libreoffice.org/download/libreoffice-fresh/)
2. config:
    * outdir - Folder for temp pdf files. Should be always empty.
```json
    "port": 3000,
    "Libreoffice": {
        "installationPath": "C:\\Program Files\\LibreOffice 5"
    },
    "outdir": "C:\\temp",
```

### Custom config fields
* can support only specific mimetypes. in the example below only files with 'image/jpeg' mimetype is will be converted:
```json
    "supportedMimeTypes": [
        "image/jpeg"
    ]
```