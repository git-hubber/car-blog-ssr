import * as React from "react";
import Helmet from "react-helmet";

import Banner from "../layout/Banner";
import Container from "../layout/Container";

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <Banner />
      <Container>
        <h1>About Us</h1>
        <p>
          Penatibus lectus sagittis aliquet vestibulum ullamcorper praesent dui
          ridiculus vitae magnis! Erat felis lacinia molestie adipiscing
          sociosqu lectus. Leo natoque nam torquent vulputate curabitur
          sollicitudin dictumst? Nascetur suspendisse orci aliquam urna
          scelerisque. Diam bibendum rhoncus convallis vehicula integer vivamus
          torquent magnis ad dolor. Vel neque felis laoreet tellus, auctor ad
          maecenas! Eu sapien dictumst vulputate faucibus dignissim aenean donec
          sed cras magnis eu. Etiam parturient eget diam sit tristique in
          iaculis tortor pretium. Enim lobortis sociosqu sollicitudin per
          lacinia tortor vitae urna lacinia? Magnis, habitasse in sociosqu nam
          ac iaculis duis metus sem purus. Pulvinar fames metus dui phasellus?
        </p>
        <p>
          Iaculis justo sapien elementum viverra penatibus praesent massa
          pharetra purus. Sodales dui magna commodo enim nisi. Ultricies quis
          cubilia primis inceptos, aliquam sit. Volutpat vulputate nostra vitae
          magna ligula parturient primis venenatis volutpat tortor. Netus mi hac
          vel conubia consectetur luctus vivamus porta faucibus ultricies
          viverra? Posuere nisi accumsan eget enim vehicula sed dapibus nam
          tincidunt laoreet nascetur eu. Sit?
        </p>
        <p>
          Tristique est molestie suspendisse netus. Orci a nostra class
          scelerisque egestas volutpat morbi vulputate malesuada torquent
          facilisi quam. Nisi, netus commodo ipsum velit pretium tellus neque
          vulputate? Amet netus interdum integer potenti! Fames aenean egestas
          vivamus tempor dui sociosqu libero suscipit aenean justo eget.
          Suspendisse ut suspendisse est. Tempus adipiscing.
        </p>
        <p>
          Lectus potenti vivamus tristique leo integer, neque egestas leo
          torquent. Vehicula purus fermentum ut ultrices diam bibendum pulvinar
          suscipit. Dignissim fermentum libero, dis quisque in penatibus
          accumsan. Gravida purus massa dui leo tempus ligula iaculis. Rutrum
          enim praesent ornare senectus laoreet condimentum hac tincidunt
          maecenas vivamus sagittis molestie. Adipiscing elementum justo sapien
          auctor ante etiam integer nisl purus volutpat ut. Torquent donec
          tortor nullam integer curabitur nostra volutpat fringilla porttitor
          orci. Condimentum praesent ante curae; ad erat fusce erat. Praesent
          lacus torquent mattis vitae aliquet tellus platea amet ultricies risus
          iaculis.
        </p>
        <p>
          Vestibulum, ac elementum augue cum adipiscing leo? Hendrerit ante
          aenean platea. Suscipit nibh senectus sodales a ad! Ad faucibus platea
          sed libero eros augue mi etiam porta. Odio cubilia sit conubia varius
          odio eros turpis montes tortor dui taciti litora. Pulvinar per,
          habitasse mi eleifend tempus metus eros feugiat leo! Imperdiet ornare
          nisi lectus semper himenaeos pellentesque! Etiam odio, lacus vitae
          hendrerit tempor commodo senectus posuere venenatis.
        </p>
      </Container>
    </>
  );
};

export default About;
