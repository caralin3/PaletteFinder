import * as React from 'react';
import ImageUploader from 'react-images-upload';

export interface ImageUploadProps {
  onUpload: (file: File) => void;
}

export interface ImageUploadPageState {
  showIcon: boolean;
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadPageState> {
  public readonly state: ImageUploadPageState = {
    showIcon: true,
  }

  public render() {
    const { showIcon } = this.state;
    return (
      <ImageUploader
        buttonText='Choose image'
        buttonStyles={{backgroundColor: '#e90798'}}
        onChange={this.handleUpload}
        fileContainerStyle={{height: '200px', width: '250px'}}
        imgExtension={['.jpg', '.png']}
        maxFileSize={5242880}
        singleImage={true}
        withIcon={showIcon}
        withLabel={false}
        withPreview={true}
      />
    )
  }

  private handleUpload = (files: File[]) => {
    if (files.length > 0) {
      const imageFile = files[0];
      this.props.onUpload(imageFile);
    }
    this.setState({
      showIcon: !this.state.showIcon,
    })
  }
}