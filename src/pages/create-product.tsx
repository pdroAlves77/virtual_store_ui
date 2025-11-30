import { CONFIG } from 'src/config-global';

import { CreateProductView } from '../sections/product/create';

export default function CreateProductPage() {
  return (
    <>
      <title>{`Create Product - ${CONFIG.appName}`}</title>
      
      <CreateProductView />
    </>
  );
}