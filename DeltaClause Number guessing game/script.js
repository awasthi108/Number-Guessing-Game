document.addEventListener('DOMContentLoaded', function () {
   const secretNumber = Math.floor(Math.random() * 100) + 1;
   let attempts = 0;

   const playCorrectSound = () => {
       const correctSound = new Audio('correct.mp3');
       correctSound.play();
   };

   const playWrongSound = () => {
       const wrongSound = new Audio('wrong.mp3');
       wrongSound.play();
   };

   const getHint = (userGuess) => {
      const difference = Math.abs(secretNumber - userGuess);
  
      if (userGuess === secretNumber) {
          return "Congratulations! You guessed it!";
      } else if (difference <= 5) {
          return userGuess < secretNumber
              ? 'Close but too low! Try again.'
              : 'Close but too high! Try again.';
      } else {
          return userGuess < secretNumber
              ? 'Too low! Try again.'
              : 'Too high! Try again.';
      }
  };
  

   const triggerConfetti = () => {
       const duration = 5 * 1000; // Duration of the confetti shower in milliseconds
       const { clientWidth, clientHeight } = document.documentElement;

       canvasConfetti({
           particleCount: 100,
           spread: 160,
           origin: { y: 0.6 },
           colors: ['#4CAF50', '#F44336', '#2196F3', '#FF9800', '#9C27B0'],
           disableForReducedMotion: true,
           particleSpeed: (size) => size * 2,
           ticks: duration / 100,
           zIndex: 1000,
           scalar: 1.5,
           recycle: true,
           clear: true
       });

       setTimeout(() => {
           // Clear the confetti after the specified duration
           canvasConfetti({
               particleCount: 0,
               recycle: false
           });
       }, duration);
   };

   const checkGuess = () => {
       const userGuess = parseInt(document.getElementById('guess').value);
       attempts++;

       const hint = getHint(userGuess);

       if (userGuess === secretNumber) {
           document.getElementById('result').innerHTML = hint;
           document.getElementById('result').classList.add('text-success');
           playCorrectSound();
           triggerConfetti();
       } else {
           document.getElementById('result').innerHTML = hint;
           document.getElementById('result').classList.add('text-danger');
           playWrongSound();
       }
   };

   document.getElementById('submitBtn').addEventListener('click', checkGuess);
});
