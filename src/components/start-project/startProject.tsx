import { Button } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Link from "next/link";

export default function StartProjectPage() {
    return (
        <div>
            <Link href="/start-project/create-project">
                <Button variant="contained" startIcon={<RocketLaunchIcon />}> Start Project </Button>
            </Link>
            <h1>How to start my project?</h1>
            <p>1. Create an account</p>
            <p>2. Create a project</p>

            <p>3. Add your team members</p>
            <p>4. Start working on your project</p>
        </div>
    );
}