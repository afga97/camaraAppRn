import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { View, Text, TouchableOpacity, Image } from 'react-native'

const App = () => {

  const [urlProfile, setUrlProfile] = useState('https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')

  const dataImage = (image) => {
    const { path, mime } = image;
    const fileToUpload = {
      uri: path,
      type: mime,
      name: path.substring( path.lastIndexOf('/') + 1)
    }
    return fileToUpload
  }

  const openCamera = () => {
    ImagePicker.openCamera({
      cropperToolbarTitle: 'Recorta tu imagen de perfil',
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      useFrontCamera: true,
      showCropGuidelines: true,
      showCropFrame: true,
      freeStyleCropEnabled: true
    }).then(image => {
      console.log(image);
      const fileToUpload = dataImage(image);
      console.log(fileToUpload);
      const formData = new FormData();
      formData.append('archivo', fileToUpload)
      setUrlProfile(image.path)
    }, err => console.log(err) );
  }

  const openCameraGallery = () => {
    ImagePicker.openPicker({
      cropperToolbarTitle: 'Recorta tu imagen de perfil',
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      useFrontCamera: true,
      showCropGuidelines: true,
      showCropFrame: true,
      freeStyleCropEnabled: true
    }).then(image => {
      console.log(image);
      setUrlProfile(image.path)
    }, err => console.log(err) );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 35, textAlign: 'center' }}>Tomate una foto</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 15 }}>
        <TouchableOpacity 
          onPress={ openCamera }
          style={{ backgroundColor: 'blue', width: 130, height: 70, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}> Abrir camara </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={ openCameraGallery }
          style={{ marginLeft: 6, backgroundColor: 'red', width: 130, height: 70, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}> Ver galeria </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          source={{ uri: urlProfile }} 
          style={{ width: '100%', height: 350, resizeMode: 'contain' }}
        />
      </View>
    </View>
  )
}

export default App