import React from "react";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="py-10 text-center text-gray-500 text-sm bg-black border-t border-gray-800">
          <div className=" ">
            &copy; 2025 Cyclopedia. All rights reserved.
            <ul className="m-10 flex-nowrap space-y-2 items-center justify-center lg:flex lg:items-center font-bold font-mono space-x-5">
              <li>
                <a href="/politics" className="">
                  Politics
                </a>
              </li>
              <li>
                <a href="/religion" className="">
                  Religion
                </a>
              </li>
              <li>
                <a href="/history" className="">
                  History
                </a>
              </li>
              <li>
                <a href="/science" className="">
                  Sciene
                </a>
              </li>
              <li>
                <a href="/media" className="">
                  Media
                </a>
              </li>
              <li>
                <a href="/global" className="mr-5 lg:-mt-3">
                  News
                </a>
              </li>
            </ul>
          </div>
          <img src="/hid.png" alt="logo" className="h-30 w-30 -mt-5 mx-auto" />
          {/* Footer */}
        </footer>
      </div>
    </div>
  );
};

export default Footer;
