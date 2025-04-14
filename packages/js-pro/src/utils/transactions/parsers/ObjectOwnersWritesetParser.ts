import { WriteSetChange } from "@aptos-labs/ts-sdk";
import { isWriteResourceChange, normalizeAddress } from "../shared";
import { WritesetParser } from "../../../types/parsers";

export class ObjectOwnersWritesetParser extends WritesetParser<
  object,
  { objectOwners: { [objectAddress: string]: string } }
> {
  override parse(
    context: object & { objectOwners: { [objectAddress: string]: string } },
    change: WriteSetChange
  ) {
    if (
      !isWriteResourceChange(change) ||
      change.data.type !== "0x1::object::ObjectCore"
    ) {
      return false;
    }

    const resource = change.data;

    const objectAddress = normalizeAddress(change.address);
    const { owner } = resource.data as { owner: string };
    context.objectOwners[objectAddress] = normalizeAddress(owner);

    return true;
  }
}
