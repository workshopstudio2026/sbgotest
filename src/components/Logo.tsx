export const Logo = ({ className = "h-[150px] w-[150px]", variant = "color" }: { className?: string, variant?: 'color' | 'bw' }) => {
  if (variant === 'bw') {
    return (
      <img src="/SBGO%20Logo_SB%20GO%20B-W.png" alt="SB GO logo black and white" className={className} />
    );
  }

  return (
    <img src="/SBGO%20Logo_SB%20GO%20Color.png" alt="SB GO logo" className={className} />
  );
};
