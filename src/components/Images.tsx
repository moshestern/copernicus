type ImagesProp = {
    imagesSrc: string[]
    filter: number
}

export const Images = (props: ImagesProp) => {
    const {imagesSrc, filter} = props;
    const imgesEl = imagesSrc.map((img, index) => (<img src={img} alt="israel" key={index} style={{'filter': `brightness(${filter})`}}></img>));
    return (
        <div className="images-wrapper">
            {imgesEl}
        </div>
    );
};
