import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { ActivityInterface } from "../models/Activity";
import { v4 as uuid } from "uuid"

export default class ActivityStore{
    activityRegistry = new Map<string,ActivityInterface>()
    activity: ActivityInterface | undefined = undefined
    editMode = false
    loading = true
    submitting = false

    constructor(){
        makeAutoObservable(this)
    }

    get activityByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities =async () => {
        try {
            const activities = await agent.Activities.list()
            activities.forEach(x => this.setActivityRegistry(x))

            this.setLoading(false)
        } catch (error) {
            console.log(error);
            this.setLoading(false)
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)

        if(activity){
            this.activity = activity
            return activity;
        }
        else{
            this.setLoading(true);
            try {
                activity = await agent.Activities.details(id)
                this.setActivityRegistry(activity);
                this.setActivity(activity);
                this.setLoading(false);

                return activity;
            } catch (error) {
                console.log(error);
                this.setLoading(false)
                
            }
        }
    }

    private setActivity(activity: ActivityInterface){
        this.activity = activity;
    }

    private getActivity(id: string){
        return this.activityRegistry.get(id);
    }

    private setActivityRegistry(activity: ActivityInterface){
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id,activity);
    }

    setLoading = (state: boolean) => {
        this.loading = state
    }

    createActivity = async(activity: ActivityInterface) => {
        this.submitting = true;

        try {
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.activity = activity;
                this.submitting = false;
                this.editMode = false;
            }) 
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    updateActivity = async(activity: ActivityInterface) => {
        this.submitting = true;

        try {
           await agent.Activities.update(activity);

           runInAction(() => {
                this.activityRegistry.set(activity.id,activity)
                this.activity = activity
                this.submitting = false;
                this.editMode = false;
           })

        } catch (error) {
            console.log(error);
            this.loading = false;
               
        }
    }

    closeForm = () => {
        this.editMode = false
        this.activity = undefined
    }

    deleteActivity = async(id: string) => {
        this.submitting = true;
        try {
            await agent.Activities.delete(id);

            runInAction(() => {
                this.activityRegistry.delete(id)
                this.submitting = false
            })


        } catch (error) {
            console.log(error);
            this.submitting = false;
        }
    }

};
