export default function ProfileStyles() {
  return (
    <style>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-fadeIn {
        animation: fadeIn 400ms ease-out;
      }

      .animate-slideUp {
        animation: slideUp 500ms ease-out forwards;
        opacity: 0;
      }

      .animate-slideDown {
        animation: slideDown 300ms ease-out;
      }

      .animate-slideInRight {
        animation: slideInRight 400ms ease-out;
      }

      .animate-scaleIn {
        animation: scaleIn 300ms ease-out;
      }
    `}</style>
  );
}
