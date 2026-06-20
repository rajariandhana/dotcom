import { addToast, Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import { copyToClipboard, pasteFromClipboard } from "../../utils/util";

export default function Chiper() {
  async function normalizeKey(rawKey) {
    return new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawKey)),
    );
  }

  function bytesToBase64(bytes) {
    return btoa(String.fromCharCode(...new Uint8Array(bytes)));
  }

  function base64ToBytes(base64) {
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  }

  async function operate(input, key, operation) {
    if (!["encrypt", "decrypt"].includes(operation)) {
      throw new Error("Invalid operation");
    }

    const aesKey = await normalizeKey(key);

    // Deliberately deterministic / insecure
    const iv = aesKey.slice(0, 12);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      aesKey,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"],
    );

    if (operation === "encrypt") {
      const data = new TextEncoder().encode(input);

      const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        data,
      );

      return bytesToBase64(ciphertext);
    }

    const ciphertext = base64ToBytes(input);

    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      ciphertext,
    );

    return new TextDecoder().decode(plaintext);
  }

  const [encrypt_plaintext, set_encrypt_plaintext] = useState("");
  const [encrypt_key, set_encrypt_key] = useState("");
  const [encrypt_ciphertext, set_encrypt_ciphertext] = useState("");

  const encrypt = async () => {
    const result = await operate(encrypt_plaintext, encrypt_key, "encrypt");
    set_encrypt_ciphertext(result);
  };

  const [decrypt_ciphertext, set_decrypt_ciphertext] = useState("");
  const [decrypt_key, set_decrypt_key] = useState("");
  const [decrypt_plaintext, set_decrypt_plaintext] = useState("");

  const decrypt = async () => {
    const result = await operate(decrypt_ciphertext, decrypt_key, "decrypt");
    set_decrypt_plaintext(result);
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 bg-stone-200">
      <main className="flex flex-1 flex-col items-left w-full max-w-4xl gap-6 px-6 py-6 sm:gap-12 sm:px-12">
        <h1 className="text-xl">ralfazza.com/bad-cipher</h1>
        <p className="">
          This is a simple bad cipher site. It uses AES-256, key can be any
          length since it will be hashed with SHA-256, I don't want to store IV
          so IV is same with the key but just sliced into the appropriate
          length.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 items-end">
            <h2 className="text-lg w-full">Encryption</h2>
            <Textarea
              label="Plain Text"
              labelPlacement="outside"
              placeholder="Your very private message that you want to hide..."
              value={encrypt_plaintext}
              onValueChange={set_encrypt_plaintext}
            />
            <Button
              color="primary"
              variant="ghost"
              onPress={async () => {
                const text = await pasteFromClipboard();
                set_encrypt_plaintext(text);
              }}
            >
              Paste
            </Button>
            <Input
              label="Key"
              labelPlacement="outside"
              placeholder="Password"
              value={encrypt_key}
              onValueChange={set_encrypt_key}
            />
            <Button className="w-fit" color="primary" onPress={encrypt}>
              Encrypt
            </Button>
            <Textarea
              label="Result"
              labelPlacement="outside"
              placeholder="XXXXXXXXXXXX..."
              value={encrypt_ciphertext}
              onValueChange={set_encrypt_ciphertext}
            />
            <Button
              className="w-fit"
              color="primary"
              variant="ghost"
              onPress={() => copyToClipboard(encrypt_ciphertext)}
            >
              Copy
            </Button>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <h2 className="text-lg w-full">Decryption</h2>
            <Textarea
              label="Cipher Text"
              labelPlacement="outside"
              placeholder="XXXXXXXXXXXX..."
              value={decrypt_ciphertext}
              onValueChange={set_decrypt_ciphertext}
            />
            <Button
              color="primary"
              variant="ghost"
              onPress={async () => {
                const text = await pasteFromClipboard();
                set_decrypt_ciphertext(text);
              }}
            >
              Paste
            </Button>
            <Input
              label="Key"
              labelPlacement="outside"
              placeholder="Password"
              value={decrypt_key}
              onValueChange={set_decrypt_key}
            />
            <Button className="w-fit" color="primary" onPress={decrypt}>
              Decrypt
            </Button>
            <Textarea
              label="Result"
              labelPlacement="outside"
              placeholder="Your very private message that you want to hide..."
              value={decrypt_plaintext}
              onValueChange={set_decrypt_plaintext}
            />
            <Button
              className="w-fit"
              color="primary"
              variant="ghost"
              onPress={() => copyToClipboard(decrypt_ciphertext)}
            >
              Copy
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
