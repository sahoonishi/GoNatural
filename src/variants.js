export const fadeIn =(direction , delay) => {
  return {
    hidden:{
      y: direction === 'down' ? 40 : direction === 'up' ? -40 : 0,
      
      x:direction === 'left' ? 90 : direction === 'right' ? -90 : 0,
    },
    show:{
      y:0,
      x:0,
      opacity:1,
      transition:{
        delay:delay,
        duration:1.8,
        type: 'fade',
        ease:[0.25 , 0.25,0.25 , 0.75],
      
      }
    }
  }
}