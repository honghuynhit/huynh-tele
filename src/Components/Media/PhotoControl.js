import React from 'react';
import './PhotoControl.css';
import ChatStore from "../../Stores/ChatStore";

class PhotoControl extends React.Component {
    constructor(props){
        super(props);

        this.onPhotoUpdated = this.onPhotoUpdated.bind(this);
    }

    /*shouldComponentUpdate(nextProps, nextState){
        if (nextProps.chat !== this.props.chat){
            return true;
        }

        return false;
    }*/

    componentWillMount(){
        ChatStore.on("message_photo_changed", this.onPhotoUpdated)
    }

    onPhotoUpdated(payload) {
        if (this.props.message && this.props.message.id === payload.messageId){
            this.forceUpdate();
        }
    }

    componentWillUnmount(){
        ChatStore.removeListener("message_photo_changed", this.onPhotoUpdated);
    }

    getSize(sizes, dimension){
        if (!sizes) return null;
        if (sizes.length === 0) return null;

        return sizes[1];
    }

    render() {
        let size = this.getSize(this.props.message.content.photo.sizes, 90);
        if (!size) return null;
        let width = this.props.message.content.photo.sizes[1].width;//size.width;
        let height = this.props.message.content.photo.sizes[1].height;//size.height;

        //let style = { height: height + 'px', width: width + 'px' };

        return size.blob !== undefined ?
            (<img className='photo-img' width={width} height={height} src={URL.createObjectURL(size.blob)} alt=""></img>) :
            (<img className='photo-img' width={width} height={height} src="" alt=""></img>);
    }
}

export default PhotoControl;