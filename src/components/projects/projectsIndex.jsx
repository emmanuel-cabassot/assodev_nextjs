
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/system';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

function ProjectsIndex(projects) {
    if(Array.isArray(projects.projects)) {
    return (
        <Box display="flex" flexWrap="wrap">
            {projects.projects.map(project => {
                const avatarUser = project.user.profileImage ? project.user.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png";
                return (
                    <Card sx={{ Width: 345, maxWidth:345, m:3 }} key={project.id} >
                        <CardHeader
                            avatar={
                                <Avatar
                                    key={project.user.id + project.user.profileImage}
                                    src={`${urlApiNest}/user/profile-image/${avatarUser}`}
                                    aria-label="recipe">
                                </Avatar>
                            }
                            title={project.name}
                            subheader={project.createdAt}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            width="345"
                            image={`${urlApiNest}/project/project-image/${project.projectImage}`}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {project.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {project.competences.map(competence => {
                                    return (
                                        <span key={competence.competence.name}>{competence.competence.name}</span>
                                    )
                                }
                                )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paddingTop="15px">
                                Team
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>

                                {project.projectUsers.map(projectUser => {
                                    return (
                                        <Avatar
                                            key={projectUser.user.id + projectUser.user.profileImage + "team"}
                                            src={`${urlApiNest}/user/profile-image/${projectUser.user?.profileImage ? projectUser.user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png"}`}
                                            aria-label="recipe">

                                        </Avatar>
                                    )
                                })}
                            </Box>

                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                )
            })}
        </Box>
    )
    } else {
        console.log(projects)
        return (
            <Box>
                <h1>Projects</h1>
                <p>There are no projects</p>
            </Box>
        )
    }
}

export default ProjectsIndex