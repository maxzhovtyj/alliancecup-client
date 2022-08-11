import React from 'react';
import CategoryItemComponent from "./categoryItem.component";

let categories = [
    {id: 1, title:"Одноразові стакани", imgUrl: "https://lh3.googleusercontent.com/fYuEjedLf_DJtUBd5AbG7PSXPRr2IV6iCWda1GMuRI2Wm5ea6FxiuCJkJeQ-GTYaR-FA-2WUnfXiCdB2mXYJ9TdPv2Ts_Tne4kINtwJwCrQlsDMegtiPh3NQlXtLvZER4PyS16Ok_xz07QlNyQBcDYlvhNtG3d86VKIPeWGHmIfd97V2lrfXxaYnw6q7EjMrWKRUlx5zs5C_PocL2w9lRb1y4xadOr-5fRlC6pz1f37M2k8HjDTHqDKnA3epghxljzN4FivSDIrqboP1z-K5NE9w_ikRJ7dQktQ_yH8egI88h1AVa9ubDByHH2WJQqyPgeZVC2wfBEYrfsj5E11YMY2WiAk9tPMtwjbf7EvcUD0_oje-0y0KYcApaAPdOJFXHX56OhDtFc0nNSw_rY00-pAAjWPUkC7dMd_lp2xBg7Qp_OSp5yF6mIRXa3MuJaP43W-vS_RPMtUYVHnHcQk-MsAWUBf0snevoSY79NFxpRwwaBatmvgz32ay2wk9xv9It_mwa57L7ZGxsjoeTqKeGL8DTgDDq2D9G2IdXyfcEzSiuZlEFgK9ebWZ6tQ0uQa8q9iR-OE6aG2xbxqWJItqK_2Y6TyYSDANCZHE5ynfGiNKGEcSzzw-vL5D0a_ZQBsQZyS1RcprGJWIo8aryDhFZani7wze2edyVYyVaJ3VX-mbaW8I4SCZuFjFSl_Jm-zhUMs3ZF9tjzDapw2oRVZQvxpYb5jhClMs7iw5fk9JrUg7ZFpVymtyvV8ApW-IoJDtsayY3fcYySUsVKx0bqxfmVwdfxeRv7bz=w325-h231-no?authuser=0"},
]

function CategoriesComponent(props) {
    return (
        <ul>
            {categories.map(item => <CategoryItemComponent props={item}/>)}
        </ul>
    );
}

export default CategoriesComponent;