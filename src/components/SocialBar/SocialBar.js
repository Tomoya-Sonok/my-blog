import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Github, Twitter, Facebook, Medium } from '../icons';

function SocialBar() {
  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={socialQuery}
      render={data => {
        const { twitter, github, facebook } = data.site.siteMetadata.social;
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: 'auto',
            }}
          >
            {facebook && <Facebook username={facebook} />}
            {twitter && <Twitter username={twitter} />}
            {github && <Github username={github} />}
          </div>
        );
      }}
    />
  );
}

const socialQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
          facebook
        }
      }
    }
  }
`;
export default SocialBar;
