


import { forwardRef } from "react";

import ResumePreview from "./ResumePreview";

const PrintableResume = forwardRef((props, ref) => {

    return (

        <div ref={ref}>

            <ResumePreview />

        </div>

    );

});

PrintableResume.displayName = "PrintableResume";

export default PrintableResume;

