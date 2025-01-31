import React, { useState } from "react";

const NavBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  // Function to open the dialog with different content
  const openDialog = (content) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // FAQ content
  const faqContent = (
    <div>
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      <div className="mt-4">
        <div className="mb-3">
          <h4 className="font-semibold">1. What is the Haku-1?</h4>
          <p>The Haku-1 is a compact, wireless, and USB-C chargeable indirect ophthalmoscope designed for portability and ease of use.</p>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold">2. Who is Haku?</h4>
          <p>Haku the ragdoll cat is the mascot of Hakumoo Labs!</p>
          <img 
            src="/hakumoo-labs/haku.jpg" 
            alt="Haku the ragdoll cat" 
            className="w-64 h-64 rounded-3xl object-cover mt-4" 
          />
        </div>
        <div className="mb-3">
          <h4 className="font-semibold">3. What are the materials of the Haku-1?</h4>
          <p>We use FDM 3D printing to produce most of our parts. Each Haku-1 is built with a combination of parts printed in
            ASA/ABS, nylon, and TPU. These materials make for durable, UV-resistant, warp-resistant, flexible, and lightweight parts which
            allows the total construction of the Haku-1 to be particularly cost-effective.
          </p>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold">4. How long does the battery last?</h4>
          <p>The Haku-1 offers up to 7 hours of continuous usage on a single charge, depending on usage settings.</p>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold">5. How can I purchase the Haku-1?</h4>
          <p>If you are interested in purchasing your own color-customized Haku-1, copy the color configuration and contact us via email for payment and details. 
            Otherwise, if you would like to purchase the Haku-1 in available standard colors, please visit our partner eyemobil.com.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <nav className="bg-slate-100 text-gray-700 h-14 flex items-center justify-center gap-40">
        <div className="flex items-center space-x-3">
          {/* Logo Image */}
          <img src="/hakumoo-labs/logo.png" alt="Hakumoo Labs Logo" className="h-12" />
          <div className="text-xl font-bold">Hakumoo Labs</div>
        </div>
        <div className="space-x-4 hidden md:flex">
          <a
            href="#"
            className="hover:underline"
            onClick={() => openDialog("About")}
          >
            About
          </a>
          <a
            href="#"
            className="hover:underline"
            onClick={() => openDialog("FAQ")}
          >
            FAQ
          </a>
          <a
            href="#"
            className="hover:underline"
            onClick={() => openDialog("Contact")}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          {/* Dialog Content */}
          <div className="bg-white p-6 rounded-md w-1/3 z-50">
            <h2 className="text-xl font-bold">{dialogContent} Info</h2>

            {/* Content based on dialog type */}
            {dialogContent === "About" ? (
              <div>
                <p>
                  Learn more about the Haku-1 through this video:
                </p>
                <div className="my-4">
                  {/* Embed the video using iframe */}
                  <iframe
                    src="https://drive.google.com/file/d/1YeMdhij_jzDqkohb6VmDT5ZaOkKhTckW/preview"
                    width="100%"
                    height="315"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : dialogContent === "FAQ" ? (
              faqContent // Render FAQ content
            ) : (
              <p>
                Here is our contact information. Feel free to reach out!
              </p>
            )}

            <button
              onClick={closeDialog}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
