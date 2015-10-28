#Upload Service

This upload service limits upload to image type and can upload other fields as well

```
self._createUploadOptions = function(data) {
    return {
        url: self.createUrl,
        method: 'POST',
        fields: { brand: data.brand },
        file: data.image,
        fileFormDataName: "image"
    };
};

self._createBrand = function (response){
    var brand = new BrandModel(response.data);
    brand.setUpdateUrl(self.changeUpdateUrl(response.data.id));
    brand.setRemoveUrl(self.changeDeleteUrl(response.data.id));
    return brand;
};
```