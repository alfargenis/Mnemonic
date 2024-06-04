import React from "react";
import { motion } from "framer-motion";
import iconeth from "../assets/iconeth.svg";
import { generateMnemonic, validateMnemonic } from "bip39";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./MnemonicGenerator.css";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const MnemonicGenerator = () => {
  const [mnemonic, setMnemonic] = React.useState("");
  const [isValid, setIsValid] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  const generateNewMnemonic = () => {
    const newMnemonic = generateMnemonic(256);
    setMnemonic(newMnemonic);
    setIsValid(validateMnemonic(newMnemonic));
    setCopied(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="container" onSubmit={onSubmit}>
        <div className="logo">
          <img src={iconeth} alt="Icono ETH" />
        </div>
        <h2 className="title">Mnemonic Phrase Generator</h2>
        <button
          className="button"
          type="submit"
          onClick={generateNewMnemonic}
          onTouchStart={generateNewMnemonic}
        >
          Generate seed phrase
        </button>
        {mnemonic && (
          <motion.div
            className="mnemonic-container"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <p className="mnemonic-text">{mnemonic}</p>
            <p className={`status-text ${isValid ? "" : "invalid"}`}>
              {isValid ? (
                <CopyToClipboard text={mnemonic} onCopy={handleCopy}>
                  <button className="button">Copy to clipboard</button>
                </CopyToClipboard>
              ) : (
                "Invalid sentence"
              )}
            </p>
            {copied && (
              <motion.p
                className="copied-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                The seed phrase was copied
                <img src={iconeth} className="icon" alt="Icono ETH" />
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export { MnemonicGenerator };
