interface LoginBackgroundProps {
  backgroundImage: string;
}

export function LoginBackground({ backgroundImage }: LoginBackgroundProps) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: '100%',
        }}
      />
      <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />
    </>
  );
}
