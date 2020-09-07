import Keychain, { privateToPublic } from "./keychain";
import { utils, HexString } from "@ckb-lumos/base";

export enum AddressType {
  Receiving = 0,
  Change = 1,
}

export interface PublicKeyInfo {
  blake160: HexString;
  path: string;
  publicKey: HexString;
}

export class ExtendedPublicKey {
  publicKey: HexString;
  chainCode: HexString;

  constructor(publicKey: HexString, chainCode: HexString) {
    utils.assertHexString("publicKey", publicKey);
    utils.assertHexString("chainCode", chainCode);

    this.publicKey = publicKey;
    this.chainCode = chainCode;
  }

  serialize(): HexString {
    return this.publicKey + this.chainCode.slice(2);
  }

  static parse(serialized: HexString): ExtendedPublicKey {
    utils.assertHexString("serialized", serialized);
    return new ExtendedPublicKey(
      serialized.slice(0, 68),
      "0x" + serialized.slice(68)
    );
  }
}

// Extended public key of the BIP44 path down to account level,
// which is `m/44'/309'/0'`. This key will be persisted to wallet
// and used to derive receiving/change addresses.
export class AccountExtendedPublicKey extends ExtendedPublicKey {
  public static ckbAccountPath = `m/44'/309'/0'`;

  static parse(serialized: HexString): AccountExtendedPublicKey {
    utils.assertHexString("serialized", serialized);
    return new AccountExtendedPublicKey(
      serialized.slice(0, 68),
      "0x" + serialized.slice(68)
    );
  }

  publicKeyInfo(type: AddressType, index: number): PublicKeyInfo {
    const publicKey: string = this.getPublicKey(type, index);
    const blake160: string = new utils.CKBHasher()
      .update(publicKey)
      .digestHex()
      .slice(0, 42);
    return {
      publicKey,
      blake160,
      path: AccountExtendedPublicKey.pathFor(type, index),
    };
  }

  public static pathForReceiving(index: number) {
    return AccountExtendedPublicKey.pathFor(AddressType.Receiving, index);
  }

  public static pathForChange(index: number) {
    return AccountExtendedPublicKey.pathFor(AddressType.Change, index);
  }

  public static pathFor(type: AddressType, index: number): string {
    return `${AccountExtendedPublicKey.ckbAccountPath}/${type}/${index}`;
  }

  private getPublicKey(type = AddressType.Receiving, index: number): HexString {
    const keychain = Keychain.fromPublicKey(
      Buffer.from(this.publicKey.slice(2), "hex"),
      Buffer.from(this.chainCode.slice(2), "hex"),
      AccountExtendedPublicKey.ckbAccountPath
    )
      .deriveChild(type, false)
      .deriveChild(index, false);

    return "0x" + keychain.publicKey.toString("hex");
  }
}

export class ExtendedPrivateKey {
  privateKey: HexString;
  chainCode: HexString;

  constructor(privateKey: HexString, chainCode: HexString) {
    utils.assertHexString("privateKey", privateKey);
    utils.assertHexString("chainCode", chainCode);

    this.privateKey = privateKey;
    this.chainCode = chainCode;
  }

  serialize(): HexString {
    return this.privateKey + this.chainCode.slice(2);
  }

  toExtendedPublicKey(): ExtendedPublicKey {
    const publicKey: HexString =
      "0x" +
      privateToPublic(Buffer.from(this.privateKey.slice(2), "hex")).toString(
        "hex"
      );
    return new ExtendedPublicKey(publicKey, this.chainCode);
  }

  static parse(serialized: HexString): ExtendedPrivateKey {
    utils.assertHexString("serialized", serialized);
    return new ExtendedPrivateKey(
      serialized.slice(0, 66),
      "0x" + serialized.slice(66)
    );
  }
}
