import  "../.astro/types.d.ts"
import "astro/client"

declare module "astro" {
	interface HTMLAttributes {
		"epub:type"?: string;
	}
}
