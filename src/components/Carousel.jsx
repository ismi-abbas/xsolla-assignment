export default function Carousel({ images }) {
  let imageUrls = [
    "https://cdn3.xsolla.com/img/misc/images/0d8f36db4f2be47ba8977996b223eebc.png",
    "https://cdn3.xsolla.com/img/misc/images/9cab2984237601919d9564d57b4455b5.png",
    "https://cdn3.xsolla.com/img/misc/images/7787e8e4748dbcfcc4dd08a8e652ba8a.png",
    "https://cdn3.xsolla.com/img/misc/images/e18f7602ef21ea19571bda7149e0726c.jpg",
  ];
  return (
    <>
      {images.map((image, idx) => {
        <img
          key={idx}
          class="h-auto max-w-lg rounded-lg"
          src={image}
          alt="image description"
        />;
      })}
    </>
  );
}
