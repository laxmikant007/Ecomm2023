import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const Pagenotfound = () => {
  return (
    <Layout title={"go back- page not found"}>
      {/* <div   className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
         
          
        </Link>
      </div> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid xs={6}>
              <Typography variant="h1">
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Button onClick={() => window.history.back()} variant="contained">Back Home</Button>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
                alt=""
                width={500} height={"auto"}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Pagenotfound