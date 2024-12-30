import { NextFunction, Request, Response } from "express";
import { AppRequest } from "../../../../shared/types";
import { CreateOrganizationUseCase } from "../../../../application/use-cases/organizer/create-organizer";
import { OrganizerRegisterValidate } from "../../../validators/organizer-schema";
import { util } from "../../../../shared/utils/common";
import { UpdateHostUseCase } from "../../../../application/use-cases/host/update-host";

export class OrganizerController {
  constructor(
    private createOrganizerUseCase: CreateOrganizationUseCase,
    private updateHostUseCase: UpdateHostUseCase
  ) {}
  async createOrganizer(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const hostId = req.hostId;
    const { name, address, about, website, logo, facebook, instagram, x } =
      req.body;
    const result = OrganizerRegisterValidate.safeParse({
      name,
      address,
      about,
      website,
      logo,
      facebook,
      instagram,
      x,
    });
    if (result.success) {
      try {
        const org = await this.createOrganizerUseCase.execute(
          name,
          address,
          website,
          logo,
          about,
          facebook,
          instagram,
          x
        );
        if (org) {
          try {
            const host = await this.updateHostUseCase.execute(hostId!, org.id);
            if (host) {
              res.status(201).json({
                success: true,
                message: "org created successfully.",
                data: {
                  hostId: host.id,
                  orgId: org.id,
                  name: org.name,
                  address: org.address,
                  about: org.about,
                },
              });
            } else {
              res.status(403).json({
                success: false,
                message: "Host update failed.",
              });
            }
          } catch (error) {
            res.status(403);
            next(error);
          }
        } else {
          res.status(400).json({
            success: false,
            message: "Org creation failed.",
          });
        }
      } catch (error) {
        res.status(403);
        next(error);
      }
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  }
}
