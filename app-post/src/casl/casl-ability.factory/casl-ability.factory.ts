import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Posts } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
  }

type Subjects = InferSubjects<typeof Posts |typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user:User){
        const { can, cannot, build } = new AbilityBuilder<
        Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);
    
        if(user.isAdmin){
            can(Action.Manage, 'all'); 
        }
        else{
            can(Action.Read,User,{username:user.username});
            can(Action.Update,User,{username:user.username});
            can(Action.Delete,User,{username:user.username});
            can(Action.Read,Posts,{userID:user.userId});
        }
        
        
        return build({
            detectSubjectType: (item) =>
              item.constructor as ExtractSubjectType<Subjects>,
        });
    }

}