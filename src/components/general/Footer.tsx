const Footer = (): JSX.Element => {
  return (
    <div className="w-full text-center text-sm text-gray-600 py-4">
      <div className="pb-6">
        <a
          className="text-lg text-pink-600 font-bold"
          href="https://www.buymeacoffee.com/uichi"
          target="_blank"
          rel="noreferrer"
        >
          Buy me a coffee !
        </a>
      </div>
      <div>&copy; 2021 biby</div>
    </div>
  );
};

export default Footer;
