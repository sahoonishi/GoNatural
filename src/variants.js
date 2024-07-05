export const fadeIn =(direction , delay) => {
  return {
    hidden:{
      y: direction === 'down' ? 40 : direction === 'up' ? -40 : 0,
      
      x:direction === 'left' ? 40 : direction === 'right' ? -40 : 20,
    },
    show:{
      y:0,
      x:0,
      opacity:1,
      transition:{
        delay:delay,
        duration:0.5,
        type: 'fade',
        ease:[0.25 , 0.25,0.25 , 0.75],
      
      }
    }
  }
}