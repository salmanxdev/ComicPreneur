import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Thunder = ({ direction }) => {
  const thunderRef = useRef(null);
  const imgSrc = `/assets/lightning-${direction}.png`;

  useEffect(() => {
    const flashThunder = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(2, 6), flashThunder);
        }
      });

      tl.to(thunderRef.current, {
        filter: "brightness(2) drop-shadow(0px 0px 30px #fde047)",
        duration: 0.05,
        yoyo: true,
        repeat: 3
      })
      .to(thunderRef.current, {
        filter: "brightness(1) drop-shadow(0px 0px 10px rgba(253, 224, 71, 0.4))",
        duration: 0.1
      });
    };

    gsap.to(thunderRef.current, {
      scale: 1.02,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.delayedCall(1, flashThunder);

    return () => {
      gsap.killTweensOf(thunderRef.current);
      gsap.killTweensOf(flashThunder);
    };
  }, []);

  return (
    <img 
      src={imgSrc} 
      ref={thunderRef}
      alt="Thunderbolt"
      style={{
        width: '100%',
        maxWidth: '350px',
        objectFit: 'contain',
        filter: "drop-shadow(0px 0px 10px rgba(253, 224, 71, 0.4))"
      }}
    />
  );
};

export default Thunder;
