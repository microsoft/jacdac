/**
 * Information about MakeCode support for a JACDAC service
 */
interface MakeCodeService {
    /**
     * Short id of the service
     */
    service: string;
    /**
     * Client information. If string, used as github path to the GitHub repo (OWNER/NAME[/PATH]);
     * and client name is default.
     */
    client: string | {
        /**
         * GitHub slub and path (OWNER/NAME[/PATH])
         */
        repo: string;
        /**
         * By default, the client is ``modules.${SERVICE}Client`` where ``SERVICE`` is the capilized
         * service name.
         */
        client?: string;
    }
}

/**
 * A list of known MakeCode implementations. If string, assumes an implementation in microsoft/pxt-jacdac.
 */
type MakeCodeServices = (string | MakeCodeService)[]