
interface FooterProps {
  footerDictionary: {
    copyright: string;
  };
  organizationName: string;
}

export default function Footer({ footerDictionary, organizationName }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = footerDictionary.copyright
    .replace('{year}', currentYear.toString())
    .replace('{organizationName}', organizationName);

  return (
    <footer className="bg-brand-dark-slate text-brand-off-white py-8 text-center mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm">{copyrightText}</p>
      </div>
    </footer>
  );
}
