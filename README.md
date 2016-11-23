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

* __/sanity__

    returns status 200.

* __/config__

    returns configuration of service


## Requirements
1. install libreoffice from [here](https://www.libreoffice.org/download/libreoffice-fresh/)
2. config:
```json
    "Libreoffice": {
        "installationPath": "C:\\Program Files\\LibreOffice 5"
    },
    "outdir": "C:\\temp",
```

### Custom config fields
* can support only specific mime types. only and the config below (in the example below only image/jpeg mimetype is will be converted):
```
    "supportedMimeTypes": [
        "image/jpeg"
    ]
```