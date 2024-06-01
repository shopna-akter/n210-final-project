import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer justify-evenly flex md:p-10 bg-neutral text-neutral-content">
                <div className="text-center">
                    <h2 className="text-xl font-bold">PicoWorkers</h2>
                    <div className="flex gap-4">
                        <FaFacebook className="h-6 w-6"></FaFacebook>
                        <FaTwitter className="h-6 w-6"></FaTwitter>
                        <FaInstagram className="h-6 w-6"></FaInstagram>
                        <FaGithub className="h-6 w-6"></FaGithub>
                    </div>
                    <h1>© All rights reserved</h1>
                </div>
                <div>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;