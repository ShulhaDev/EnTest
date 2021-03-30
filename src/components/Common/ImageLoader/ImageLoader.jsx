import React,{useEffect} from 'react'
import ActionLabel from "../ActionLabel/ActionLabel";
import PinnedImage from "../PinnedImage";

const ImageLoader = ({setImage, image}) => {

    useEffect(()=>{
        return () => {
            setImage(undefined);
        }
    },[setImage]);

    const clearImage = () => setImage(undefined);
    const browseImage = (e) => {
        if(e.target.files && e.target.files.length > 0){
            let file = e.target.files[0];
            setImage(file);
        }
    }
    return (
        <>
            <legend align="center">image:</legend>
            <input type="file" id="wordImg" name="wordImg" accept="image/jpeg" onChange={browseImage}
                   hidden/>
            <div style={{height: "40px"}}>
                <ActionLabel htmlFor="wordImg">browse</ActionLabel>
                <ActionLabel onClick={clearImage}>clear</ActionLabel>
            </div>
            <PinnedImage src={image} alt="Not set"/>
        </>
    );
}

export default React.memo(ImageLoader);