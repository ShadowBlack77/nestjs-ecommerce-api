import { SetMetadata } from "@nestjs/common";

export const IS_SKIP_API_KEY = 'IS_SKIP_API_KEY';
export const SkipKey = () => SetMetadata(IS_SKIP_API_KEY, true);